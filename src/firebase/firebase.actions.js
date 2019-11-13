import firestore, {
    getOrCreateDocument, 
    getOrCreateDocuments,
    updateDocument, 
    getDocument, 
    createCondition, 
    reduceSnapshotToArray
} from "./firebase.utils"


export const collectionNames = {
    CATEGORIES: 'categories',
    QUIZZES: 'quizzes',
    USERS: 'users',
    QUESTIONS: 'questions',
}


export const faGetOrCreateCategory = async (categoryName) => {
    const parsedName = categoryName.toLowerCase()
    const submitObject = {name: parsedName, default: false}
    const collectionRef = firestore.collection(collectionNames.CATEGORIES)
    return await getOrCreateDocument(collectionRef, submitObject, "name")
}

export const faGetOrCreateQuestion = async (question) => {
    if(question.id) return question

    const category = !question.id ? 
        await faGetOrCreateCategory(question.category).then(category => category.name).catch(error => {throw new Error(error)})
        : question.category

                            

    const submitObject = {...question, category,default: false}

    const collectionRef = firestore.collection(collectionNames.QUESTIONS)
    return await getOrCreateDocument(collectionRef, submitObject)
}



// create quiz
export const faCreateQuiz = async (quizObj) => {
    const collectionRef = firestore.collection(collectionNames.QUIZZES)
    return await getOrCreateDocument(collectionRef, quizObj)
}
  
  
export const faSetQuizTitle = async (quizObj, title) => {
const quizRef = firestore.collection(collectionNames.QUIZZES)

updateDocument(quizRef, {id: quizObj.id, title: title})
    .then(updates => console.log({...quizObj, ...updates}))
    .catch(error => console.log(error))
}
  
export const faSetQuizCategories = async (quizObj, categories) => {
    if(categories.length != 6) return; // error
    // create or get categories => returns array of categories
    const collectionRef = firestore.collection(collectionNames.CATEGORIES)

    let quizCategories = await getOrCreateDocuments(collectionRef, categories, "name")
        .then(categories => categories)
        .catch(error => {throw new Error(error)})

    quizCategories = quizCategories.map(category => category.name)
  

    

    /* also need to update the questions aka remove questions*/
    if(quizObj.questions){

    }
    

    const quizRef = firestore.collection(collectionNames.QUIZZES)

    return await updateDocument(quizRef, {id: quizObj.id, categories: quizCategories})
        .then(updates => ({...quizObj, ...updates}))
}
  
export const faSetQuizQuestions = async (quizObj, questions) => {

    // create or get categories => returns array of categories
    const collectionRef = firestore.collection(collectionNames.CATEGORIES)
  


    let quizCategories = await getOrCreateDocuments(collectionRef, questions)
    .then(categories => categories)
    .catch(error => console.log(error))

    quizQuestions = quizCategories.map(category => category.name)
    console.log(quizCategories)

    const quizRef = firestore.collection(collectionNames.QUIZZES)

    return await updateDocument(quizRef, {id: quizObj.id, questions: quizCategories})
            .then(updates => ({...quizObj, ...updates}))
}

export const faSetQuizQuestion = async (quizObj, question) => {
    
   console.log(question)
   const newQuestion = await faGetOrCreateQuestion(question)
        .catch(error => console.log(error))


    console.log(newQuestion)

    

    const categoryQuestions = quizObj.questions ? quizObj.questions[newQuestion.category] : {}
   
   
    const {category, id, question: questionText, answer} = newQuestion

    const newQuestions = {
        ...quizObj.questions,
        [newQuestion.category]: {
            ...categoryQuestions,
            [newQuestion.value]: {category, id, question: questionText, answer}
        }
    }

    const quizRef = firestore.collection(collectionNames.QUIZZES)
    
    return await updateDocument(quizRef, {id: quizObj.id, questions: newQuestions})
        .then(updates => ({...quizObj, ...updates}))
}




  
export const getUserQuizzes = async (userId) => {
    const collectionRef = firestore.collection(collectionNames.QUIZZES)
    return await getDocument(collectionRef, {}, createCondition("userId", "==", userId))
}

export const getQuiz = async (quizId) => {

}

export const getUserQuestions = async (userId) => {

}

/* GET DEFAULT QUESTIONS / CATEGORIES */

export const faGetDefaultCategories = async () => {
    const collectionRef = firestore.collection(collectionNames.CATEGORIES)
    return await getDocument(collectionRef, {}, createCondition("default", "==", true))
}

export const faGetDefaultQuestions = async () => {
    const collectionRef = firestore.collection(collectionNames.QUESTIONS)
    return await getDocument(collectionRef, {}, createCondition("default", "==", true))
}

export const faGetQuestionSuggestions = async (categoryName, value, userId) => {
    // default questions && user questions => filtered by category sorted by prefer value, 
    const collectionRef = firestore.collection(collectionNames.QUESTIONS)


    // get deafult questions by cateory
    const defaultQuestionSnapshot = await collectionRef.where("default", "==", true)
                                .where("category", "==", categoryName)
                                .get()
                                .catch(error => {throw new Error(error)})

    // get actual question data as array
    const defaultQuestions = reduceSnapshotToArray(defaultQuestionSnapshot)


    // get user questions 
    const userQuestionSnapshot = await collectionRef.where("userId", "==", userId)
                                .where("category", "==", categoryName)
                                .get()
                                .catch(error => {throw new Error(error)})

    // get user question data as array
    const userQuestions = reduceSnapshotToArray(userQuestionSnapshot)

    // combine and remove duplicates from arrays 
    const combinedQuestionList = [...defaultQuestions,...userQuestions]

    const uniqueQuestionSet = new Set(combinedQuestionList.map(e => JSON.stringify(e)));
    const uniqueQuestionArray = Array.from(uniqueQuestionSet).map(e => JSON.parse(e));
    
    // sort by closets to value
    const sortedQuestionArray = uniqueQuestionArray.sort((f, s) => {
        // calulate distance from question value and sort accordingly
        const fDist = Math.abs(f.value - value) 
        const sDist = Math.abs(s.value - value) 
        return fDist - sDist
    })

    return sortedQuestionArray
}



  
/* USER STUFF */
  
