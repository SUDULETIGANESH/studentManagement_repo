import express from 'express'
import {getStudents,getStudentById,addStudent,updateById,deleteById} from '../Controllers/studentController.js'

const studentRoutes = express.Router();

studentRoutes.get('/',getStudents);
studentRoutes.get('/:id',getStudentById);
studentRoutes.post('/',addStudent);
studentRoutes.put('/:id',updateById);
studentRoutes.delete('/:id',deleteById);


export default studentRoutes;