/**
* Este archivo es para simplificar el archivo principal app.js
* Es la configuración del yargs.
*/

const descripcion = {
		alias: 'd',
		demand: true,
		desc: 'Descripción de una tarea por hacer.'
	}


const completado = {
	alias: 'c',
	default: true,
	desc: 'Marca como completada o pendiente la tarea.'
}

const argv = require('yargs')
				.command('crear', 'Crea un elemento por hacer.', {
					descripcion
				})
				.command('actualizar', 'Actualiza el estado completado de una tarea.', {
					descripcion,
					completado
				})
				.command('listar', 'Este método sirve para listar las tareas por hacer.')
				.command('borrar', 'Este opción permite borrar una tarea.', {
					descripcion
				})
				.help()
				.argv; 


/*Exportar achivo*/

module.exports={
	argv
}