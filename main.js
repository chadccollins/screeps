var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader')
var roleBuilder = require('role.builder')

module.exports.loop = function () {
    var jimi = Game.spawns['jimi'];
    
    // WIPE THE DEAD FROM OUR MEMORIES
    /*for(var name in Memory.creeps) {
    //    if(!Game.creeps[name]) {
    //        delete Memory.creeps[name];
    //        console.log('Clearing non-existing creep memory:', name);
    //    }
    }*/
    
    
    var creepsCount = 0;
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            creepsCount++;
        }
        
    
    if (jimi.energy >= 200)
    {
        var sources = creep.room.find(FIND_SOURCES);
     
            var name = 'builder' + Game.time;
            console.log('spawning ' + name);
            Game.spawns['jimi'].spawnCreep( [WORK, CARRY, MOVE], name );
            Game.creeps[name].memory.role = 'builder';
        
        if (creepsCount % 2 == 0)
        {   
            var name = 'harvester' + Game.time;
            console.log('spawning ' + name);
            Game.spawns['jimi'].spawnCreep( [WORK, CARRY, MOVE], name );
            Game.creeps[name].memory.role = 'harvester';
            Game.creeps[name].memory.source = sources[0];
        
        }
        else
        {
            var name = 'upgrader' + Game.time;
            
            console.log('spawning ' + name);
            Game.spawns['jimi'].spawnCreep( [WORK, CARRY, MOVE], name );
            Game.creeps[name].memory.role = 'upgrader';
        }
    }
    
    
    console.log('I AM THE DECIDER');
    var sourceIndex = 0;
    
    for(var name in Game.creeps) {
        
        sourceIndex = 0;
        
        
        var creep = Game.creeps[name];
        if (creep.memory.role == "harvester")
        {
            console.log(name + 'is a harvester ' + ' going to ' + sourceIndex);
            
            roleHarvester.run(creep, sourceIndex);
        }
        
        if (creep.memory.role == "builder")
        {
            console.log(name + ' is a builder')
            roleBuilder.run(creep);
        }
        
        if (creep.memory.role == "upgrader")
        {
            console.log(name + 'is a upgrader')
            roleUpgrader.run(creep);
        }
        
    }

    if(Game.spawns['jimi'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['jimi'].spawning.name];
        Game.spawns['jimi'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['jimi'].pos.x + 1, 
            Game.spawns['jimi'].pos.y, 
            {align: 'left', opacity: 0.8});
    }
}