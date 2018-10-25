const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () =>{

	let data = JSON.stringify(listadoPorHacer);

	// Primer parametro: path. Segundo: data; Tercero: error;
	fs.writeFile('db/data.json', data, (err) => {
		if(err) throw new Error('No se pudo grabar ', err);
	});
	
}

/**
* Esta función carga el archivo ya creado de data.json.
* Existen varias formas de hacerlo (por ejemplo desde http); como node trabaja del lado del servidor 
* se puede solicitar como un require de la siuiente forma.
*/
const cargarDB = () => {

	try{

		listadoPorHacer = require('../db/data.json');

	}catch (error){

		listadoPorHacer = [];
		
	}
}

const crear = (descripcion) =>{

	cargarDB();

	let porHacer = {
		descripcion,
		completado: false
	};

	listadoPorHacer.push(porHacer);

	guardarDB();

	return porHacer;
}

/*Función para listar lo que esta guardado en data.json*/
const getListado = () =>{
	cargarDB();
	return(listadoPorHacer);
}

const actualizar = (descripcion, completado = true) =>{

	cargarDB();

	let index = listadoPorHacer.findIndex( tarea =>{
		return tarea.descripcion === descripcion;
	});

	if (index >= 0) {
		listadoPorHacer[index].completado = completado;
		guardarDB();
		return	true;
	}else{
		return false;
	}

}

const borrar = (descripcion) =>{
	
	cargarDB();

	let nuevoListado = listadoPorHacer.filter(tarea =>{
		return tarea.descripcion !== descripcion;
	});

	if (listadoPorHacer.length === nuevoListado.length) {
		return false;
	}else{

		listadoPorHacer = nuevoListado;
		guardarDB()
		return true;
	}
}

module.exports ={
	crear,
	getListado,
	actualizar,
	borrar
}