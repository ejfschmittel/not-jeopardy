import {useState, createContext, useEffect} from "react"
import PREMADE_QUESTIONS from '../data/questions'

const INITIAL_STATE = {
    premadeQuestions: {},
    gameQuestions: {},
    gamePhase: "",
    selectedCategories: [],    
}

const LOCAL_STORAGE_ID = 'QuizContextState'

export const QuizContext = createContext(INITIAL_STATE)

export const GAME_PHASES = {
    START: 'START',
    CHOSE_CATEGORIES: 'CHOSECATEGORIES',
    SELECT_QUESTIONS: 'SELECT_QUESTIONS',
    GAME: 'GAME'
}

export const useQuizContext = () => {
    // set initial data and stateify
    const [gamePhase, setGamePhase] = useState(GAME_PHASES.START)
    const [selectedCategories, setSelectedCategories] = useState([])
    const [gameQuestions, setGameQuestions] = useState({})    
    const premadeQuestions = PREMADE_QUESTIONS
    const premadeCategories = Object.keys(premadeQuestions);

    // load in saved context state categoris and gameQuesitons on Mount
    useEffect(() => loadQuizContextState(), [])

    // save gamedata onChange of gamephase, categories or questions to local storage to persist on reload
    useEffect(() => saveQuizContextState(), [gamePhase, selectedCategories, gameQuestions])

    /* context interaction methods */

    const setGameQuestion = (categoryName, value, newQuestionData) => {
        const categoryQuestions = gameQuestions[categoryName]
        const oldQuestionData = categoryQuestions[value]

        setGameQuestions({
            ...gameQuestions,
            [categoryName]: {
                ...categoryQuestions,
                [value]: {
                    ...oldQuestionData,
                    ...newQuestionData,
                }
            }
        })
    }

    const getRandomPremadeQuestion = (category, value) => { 
        const categoryQuestions = premadeQuestions[category]
        if(categoryQuestions){
            const categoryValueQuestions = categoryQuestions[value]
            if(categoryValueQuestions){
                const randomQuestionIndex = Math.floor(Math.random() * Math.floor(categoryValueQuestions.length));
                return categoryValueQuestions[randomQuestionIndex];
            }
        }
        return {question: "", answer: "", used: false, filled: false}
    }

    const autoFillGameCategories = (categorySet) => {       
        while(categorySet.size != 6){
            const randomCategoryIndex = Math.floor(Math.random() * Math.floor(premadeCategories.length));
            const randomCategory = premadeCategories[randomCategoryIndex]
            categorySet.add(randomCategory)
        }

        setGameCategories([...categorySet])
    }

    const setGameCategories = (categoryArray) => {
        // creates empty base game objects in form
        /*
            {
                categoryName: {
                    value: {},
                    ...
                }
                ...
            }
        */
        const gameObject = categoryArray.reduce((res, category) => ({
            ...res,
            [category]: [200,400,600,800,1000].reduce((res, value) => ({...res, [value]: {}}),{})
        }), {})
        
        setSelectedCategories(categoryArray)
        setGameQuestions(gameObject)       
    }

    const autoFillAllQuestions = () => {
        const filledQuestions = Object.keys(gameQuestions).reduce((res, categoryName) => {
            const categoryQuestions = gameQuestions[categoryName]
            const filledCategories = Object.keys(categoryQuestions).reduce((catRes, categoryValue) => {
                const question = categoryQuestions[categoryValue]
                let randomQuestion = {}
                if(!question.filled){
                    randomQuestion = getRandomPremadeQuestion(categoryName, categoryValue)
                    if(randomQuestion.answer && randomQuestion.question) randomQuestion = {...randomQuestion, used: false, filled: true}
                }
                return {...catRes, [categoryValue]: {...question, ...randomQuestion, used: false}}
            },categoryQuestions)
            return {...res, [categoryName]: {...categoryQuestions, ...filledCategories}}
        },gameQuestions);

        setGameQuestions(filledQuestions)
    }

    const emptyQuestionsExist = () => {
        // checks if empty Questions exist in gameQuestions object
        return Object.keys(gameQuestions).reduce((res, cat) => 
        (res || Object.keys(gameQuestions[cat]).reduce((resCat, value) => 
        (resCat || !gameQuestions[cat][value].filled), false)), false)
    }

    
    const resetQuizState = () => {
        setGamePhase(GAME_PHASES.START)
        setSelectedCategories([])
        setGameQuestions({})
        saveQuizContextState();
    }

    const saveQuizContextState = () => {
        localStorage.setItem(LOCAL_STORAGE_ID, JSON.stringify({gamePhase, selectedCategories, gameQuestions})) 
    }

    const loadQuizContextState = () => {
        const data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ID))
        if(data){
            setGamePhase(data.gamePhase)
            setSelectedCategories(data.selectedCategories)
            setGameQuestions(data.gameQuestions)
        }
    }

    // return statefull context object
    return {
        // state 
        gamePhase,
        selectedCategories,
        gameQuestions,
        premadeQuestions,
        premadeCategories,

        // methods
        setGamePhase,
        setSelectedCategories,
        setGameQuestions,
        setGameQuestion,
        resetQuizState,
        getRandomPremadeQuestion,
        autoFillGameCategories,
        setGameCategories,
        autoFillAllQuestions,
        emptyQuestionsExist
    }
}