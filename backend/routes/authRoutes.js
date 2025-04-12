import express from 'express';
import validateRegistration  from '../middleware/validate.js';  //        ./   current directory
                                                                     //       ../  parent directory                                                                  
import registerUser  from '../controllers/authRegistreController.js';
import { loginCheck } from '../controllers/authLoginController.js';
const router = express.Router();


router.post('/register',validateRegistration, registerUser);  // folder bhitra fuunction with 
                                                                    // same name xa vani color yellow aauxa. but no called function 
                                                                    // then blue.
router.post('/login',loginCheck);
export default router;
