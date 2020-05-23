// // const mongodb = require('mongodb')
// // const MongoClient = mongodb.MongoClient
// const {MongoClient,ObjectID} = require('mongodb')
// const connectionURL = 'mongodb://127.0.0.1:27017'
// const databaseName = 'task-manager'

// MongoClient.connect(connectionURL,{ useUnifiedTopology:true},(error,client)=>{
//     if(error){
//         return console.log('Cannot connect to the server')
//     }
//     const db = client.db(databaseName)

//     db.collection('task').insertMany([
//         {
//             description:'description4',
//             completed:true
//         },
//         {
//             description:'description5',
//             completed:true
//         },
//         {
//             description:'description6',
//             completed:false
//         }
//     ],(error,result)=>{
//         if(error)
//         {
//             return console.log('The data is not inserted')
//         }
//         console.log(result.ops)
//     })
// })
// MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, client) => {
//     if (error) {
//         return console.log('Error in inserting')
//     }

//     const db = client.db(databaseName)

//     db.collection('task').findOne({ description: 'description3'}, (error, user) => {
//         if (error) {
//             return console.log('error');
//         }
//         console.log(user);
//     })

//     db.collection('task').find().toArray((error,users)=>{
//         if(error)
//         {
//             return console.log("error")
//         }
//         console.log(users)
//     })

//     db.collection('task').updateOne({ _id: new ObjectID("5ec7c11ffd23900ad196048d")},{
//         $set: {
//             description: 'descriptio1'
//         }
//     }).then((result)=>{
//         console.log(result.modifiedCount)
//     }).catch((error)=>{
//         console.log(error)
//     })

//     db.collection('task').updateMany({completed: true},{
//         $set: {completed: true}
//     }).then((result)=>{
//         console.log(result.modifiedCount)
//     }).catch((error)=>{
//         console.log(error)
//     })

//     db.collection('task').deleteOne({
//         description: 'description2'
//     }).then((result)=>{
//         console.log(result.deletedCount)
//     }).catch((error)=>{
//         console.log(error)
//     })
// })