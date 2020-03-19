const db=require("./backend/models/models");

db.sequelize.sync({force:true}).then(async()=>{
    console.log('created tables');
    
    let user=await db.User.create({
        name_user:'Popa',
        forname_user:'Andrei',
        email:'andpopa@yahoo.com',
        password:'pass'
    });
    let folder=await db.Folder.create({
        name_folder:'Matematica',
        create_date:'2018-04-10',
        id_user:user.id_user
    })
    let course = await db.Course.create({
        name_folder:'Matematica',
        create_date:'2018-04-10',
        id_folder: folder.id_folder
    })
}).catch(()=>{
    console.log('could not create tables');
})