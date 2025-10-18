
import usersModel from "../models/users.js";

const getUser = async (request, response) =>{
	const authHeader = request.headers.authorization;
	const accessToken = authHeader.split(' ')[1]; 

	usersModel.getUserId(accessToken).then(id=>{
		if(!id) {
			response.status(404).json();
			return
		}
		usersModel.getUser(id).then(user =>{
			if(user)
				response.status(200).json(user);
			response.status(404).json();
		});			
	});	
}

const updateUser = async (request, response) => {
		
	const authHeader = request.headers.authorization;
	const accessToken = authHeader.split(' ')[1]; 
	const body = request.body;

	usersModel.getUserId(accessToken).then(id=>{
		if(!id) {
			response.status(404).json();
			return
		}
		usersModel.updateUser(id, body).then(updatedUser=>{;
			if (updatedUser) 
				response.status(200).json(updatedUser);
			response.status(404).json();
		});
	});
};

// const deleteUser = async (request, response) => {
//     try {
//         const id = parseInt(request.params.id); 
//         const success = await usersModel.deleteUser(id);
//         if (success) {
//             response.status(204).json();
//         } else {
//             response.status(404).json();
//         }       
//     } catch (error) {
//         response.status(500).json({ error: `Internal Server Error:${error}` });
//     }   
// };

export default { 
	getUser,
    //getAllUsers,
    //getUserById,
    //createUser,
    updateUser,
   // deleteUser,
};



