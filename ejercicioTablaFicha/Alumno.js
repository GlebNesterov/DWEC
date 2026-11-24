class Alumno {
    nombre;
    dni;
    curso;
    asignaturas;
    telefono;
    email;

    constructor(nombre, dni, curso, asignaturas, telefono, email){
        this.nombre = nombre;
        this.dni = dni;
        this.curso = curso;
        this.asignaturas = asignaturas;
        this.telefono = telefono
        this.email = email;
    }

    get nombre(){
        return this.nombre;
    }

    get dni(){
        return this.dni;
    }

    get curso(){
        return this.curso;
    }

    get asignaturas(){
        return this.asignaturas;
    }

    get telefono(){
        return this.telefono;
    }

    get email(){
        return this.email;
    }
}
export default Alumno;