import {firestore} from "./firebase.setup"

// UTILS 
const createSubmitObject = (objectData, date=true) => date ? ({createAt: new Date() , ...objectData}) : objectData
export const createCondition = (key, comparator, value) => ({key, comparator, value})

export const reduceSnapshotToArray = (snapshot) => snapshot.docs.reduce((res, doc) => [...res, {...doc.data(), id: doc.id}], [])

// get {key comparator, }
export const getDocument = async (collectionRef, object, condition) => {
  if(!collectionRef) throw new Error("collectionRef is missing!")
  if(!object.id && !condition) throw new Error("Either object id or a uniqueValue are required to get Elements")

 
  if(object.id) return await collectionRef.doc(object.id).then(snapshot => snapshot.data())

  
  const {key, comparator, value} = condition
  const snapshot = await collectionRef.where(key,comparator, value).get()
  //const res2 = await res.docs.reduce((res, doc) => [...res, {...doc.data(), id: doc.id}], [])


  return reduceSnapshotToArray(snapshot)
}

const createGetOrCreateRequest = async (collectionRef, object, uniqueAttrib) => {
  if(!collectionRef) throw new Error("collecitonRef missing")
  const {id, ...objectData} = object

  if(id) return {returnObject: object}

  // get 
  if(!id && uniqueAttrib) {
    const condition = createCondition(uniqueAttrib, "==", object[uniqueAttrib])
    const query = await getDocument(collectionRef, object, condition)

    if(query.length > 0) return ({returnObject: query[0]})

    
  }

  // create Object
  const docRef = collectionRef.doc()
  const submitObject = createSubmitObject(objectData)

  return {
    docRef,
    submitObject,
    returnObject: {id: docRef.id, ...objectData},
  }
}

export const getOrCreateDocument = async (collectionRef, object, uniqueAttrib) => {
  const {docRef, submitObject, returnObject} = await createGetOrCreateRequest(collectionRef, object, uniqueAttrib)
  return docRef ? docRef.set(submitObject).then(() => returnObject) : returnObject
}

export const getOrCreateDocuments = async (collectionRef, objects, uniqueAttrib) => {
  const batch = firestore.batch(); 

  
  const objectsToReturn = await Promise.all(objects.map(async object => {
    const {docRef, submitObject, returnObject} = await createGetOrCreateRequest(collectionRef, object, uniqueAttrib)
    
    if(submitObject) batch.set(docRef, submitObject)
    return returnObject
  }))

  
  
  return await batch.commit().then(() => objectsToReturn) 
}


/* UPDATE DOCUMENTS  */

export const updateDocument = async (collectionRef, object) => {
  console.log("update document")
  const {id, ...objectData} = object
  if(!id || !collectionRef) throw new Error("collectionKey or documentKey missing")

  const documentRef = collectionRef.doc(id)
  
  return documentRef.update(objectData).then(() => object)
}

export const updateDocuments = async (collectionRef, objectsToAdd) => {
  if(!collectionRef) throw new Error("collectionKey missing")

  const batch = firestore.batch(); 

  objectsToAdd.forEach(obj => {
    const {id, ...objData} = obj
    const docRef = collectionRef.doc(id);
    batch.udpate(docRef, objData);
  });

  console.log("commit updates")
  return batch.commit().then(() => objectsToAdd) 
}


export default firestore;