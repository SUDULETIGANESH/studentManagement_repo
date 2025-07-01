import express from 'express'
import fs from 'fs'
import { fileURLToPath } from 'url';
import path,{dirname} from 'path'


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dataPath = path.join(__dirname, "../data.json");

const readData = ()=>{
    if(!fs.existsSync(dataPath)){
        fs.writeFileSync(dataPath,JSON.stringify([], null, 2))
    }
    const filedata = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(filedata);
}

const writeData = (data) =>{
    fs.writeFileSync(dataPath,JSON.stringify(data, null, 2))
}

const getStudents = (req,res)=>{
    const students = readData();
    res.status(200).json(students);
}

const getStudentById = (req,res)=>{
    const students = readData();
    const student = students.find(s => s.id === parseInt(req.params.id));
    if(!student) return res.status(404).json({message:"student not available"})
    res.status(200).json(student);
}

const addStudent = (req,res)=>{
    const students = readData();
    students.push({...req.body})
    writeData(students);
    res.status(200).json(students)
}

const updateById = (req,res)=>{
    const students = readData();
    const id = parseInt(req.params.id)
    const student = students.findIndex(s => s.id === id)
    if(!student) return res.status(404).json({message:"student not available"});
    students[id] = {...students[id],...req.body};
    writeData(students)
    res.json(students[id]);
}

const deleteById = (req,res)=>{
    let students = readData();
    const id = req.params.id;
    students = students.filter(student=>student.id !== id);
    writeData(students)
    res.send(204).send();
}

export {getStudents,getStudentById,addStudent,updateById,deleteById};
