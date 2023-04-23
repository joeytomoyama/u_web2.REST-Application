// objects

let age: number
age = 44

let personName: string
personName = 'john'

let isNano: boolean
isNano = false

let tracerDmg: number = 20

let reinDmg: number = 75
let tracerHp: number = 150

let tracer: Record<string, any>

tracer = {
    damage: 20,
    health: 150,
    recallCooldown: 12,
    playerName: 'Martok',
    nestedObject: { // nur zur demo
        test: 'test'
    },
    isNano: false
}

let mercy = {
    damage: 20,
    health: 150,
    resCooldown: 12,
    playerName: 'Ataru',
    // pocketed: {
    //     anything: true
    // },
    // die: function() {
    //     console.log('mercy died')
    // },
    isNano: false
}

console.log(mercy.damage)