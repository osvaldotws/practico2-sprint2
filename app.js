const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Grupo-07:grupo07@cursadanodejs.ls9ii.mongodb.net/Node-js')
    .then(() => console.log('Conexión exitosa'))
    .catch(error => console.error('Error al conectar:', error));

    const superheroSchema = new mongoose.Schema({
        nombreSuperHeroe: { type: String, required: true },
        nombreReal: { type: String, required: true },
        edad: { type: Number, min: 0 },
        planetaOrigen: { type: String, default: 'Desconocido' },
        debilidad: String,
        poderes: [String],
        aliados: [String],
        enemigos: [String],
        createdAt: { type: Date, default: Date.now }
    }, { collection: 'Grupo-07' });
    
    const Superhero = mongoose.model('Superhero', superheroSchema);
    
    async function insertSuperHero() {
        const hero = new Superhero({
            nombreSuperHeroe: 'Spiderman',
            nombreReal: 'Peter Parker',
            edad: 25,
            planetaOrigen: 'Tierra',
            debilidad: 'Radioactiva',
            poderes: ['Trepar paredes', 'Sentido arácnido', 'Super fuerza', 'Agilidad'],
            aliados: ['Ironman'],
            enemigos: ['Duende Verde'],
            creador: 'Osvaldo Paz'
        });
        await hero.save();
        console.log('Superhéroe insertado:', hero);
    }
    
    async function updateSuperHero(nombreSuperHeroe) {
        const result = await Superhero.updateOne(
            { nombreSuperHeroe: nombreSuperHeroe },
            { $set: { edad: 30 } }
        );
        console.log('Resultado de la actualización:', result);
    }
    
    async function deleteSuperHero(nombreSuperHeroe) {
        const result = await Superhero.deleteOne({ nombreSuperHeroe: nombreSuperHeroe });
        console.log('Superhéroe eliminado:', result);
    }
    async function findSuperHeroes () {
        const heroes = await Superhero.find({ planetaOrigen: 'Tierra' });
        console.log(`Superhéroes encontrados:`, heroes);
    }
    findSuperHeroes();
    
    async function main() {
        await insertSuperHero();
        console.log(insertSuperHero);
        
        await updateSuperHero('Spiderman');
        console.log(updateSuperHero);
        
        await deleteSuperHero('Spiderman');
        console.log(deleteSuperHero);
    
        await findSuperHeroes ('Tierra');
        console.log(findSuperHeroes);
        
    }