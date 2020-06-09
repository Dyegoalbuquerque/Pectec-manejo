
import { deserializeArray } from "class-transformer";
const fs = require('fs');
const path = require('path');


export class Dao {

    constructor(tipo){
        this.fonte = path.resolve(`../../Pectec/Pectec-database/database/${tipo.name}.json`);
        this.tipo = tipo;
    }

    adicionar(item)  
    {   
            var todos = this.obterTodos();  

            if(item != null && todos != undefined)
            {                   
                item.id = this.max() + 1;                    
            }else if(!todos.length == 0){
                item.id = 1;
            }
            todos.push(item);

            let serializados = JSON.stringify(todos);  
            fs.writeFileSync(this.fonte, serializados);   

            return item.id;          
    }  

    atualizar(item)  
    {   
            let todos = this.obterTodos();  

            if(item != null && todos.length > 0)
            {                   
                for(let i = 0; i < todos.length; i++)
                {
                    if(todos[i].id == item.id)
                    {
                        todos[i] = item;
                    }
                }                    
            }

            let serializados = JSON.stringify(todos);  
            fs.writeFileSync(this.fonte, serializados);   

            return item.id;          
    } 

    buscarPorId(id)
    {
        var todos = this.obterTodos();

        for(let i = 0; i < todos.length; i++)
        {
            if(todos[i].id == id)
            {
                return todos[i];
            }
        }
        return null;
    }

    buscarPorIds(ids)
    {
        var todos = this.obterTodos();

        return todos.filter(o => ids.contains(o.id));
    }

    removerPorId(id)
    {
         var todos = this.obterTodos();

        for(let i = 0; i < todos.length; i++)
        {
            if(todos[i].id == id)
            {
                 todos.splice(i, 1);
                 break;
            }
        }
        let serializados = JSON.stringify(todos);  
        fs.writeFileSync(this.fonte, serializados); 
    }

    removerTodos(){
        try {
            fs.writeFileSync(this.fonte, []);
          } catch(err) {
            console.log(err);
          }
    }

    obterTodos()  
    {  
        try {
            
            const jsonString = fs.readFileSync(this.fonte, "utf8");

            if(jsonString === ''){
                return [];
            }

            return deserializeArray(this.tipo, jsonString);
          } catch(err) {
            console.log(err);
          }
        return null;
    }

    max(){
        let todos = this.obterTodos();
        let max = 0;
        for(let i=0; i < todos.length; i++){
            if(max < todos[i].id){
                max = todos[i].id;
            } 
        } 

        return max;
    }
}