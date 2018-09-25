export const tabs = [
  'Equipment/Period', 'IMO', 'Port'
]

export const prodfam = [{value: 'DM', label: 'DM'},
  {value: 'SG', label: 'SG'},
  {value: 'Rudder', label: 'Rudder'}]

export const product2 = [{value: 'DM', label: 'DM', link: 'DM'},
  {value: 'LP Winch', label: 'LP Winch', link: 'DM'},
  {value: 'SG-RV', label: 'SG-RV', link: 'SG'},
  {value: 'SG-SR', label: 'SG-SR', link: 'SG'},
  {value: 'SG', label: 'SG', link: 'SG'},
  {value: 'Rudder', label: 'Rudder', link: 'Rudder'},
  {value: 'Nordavit', label: 'Nordavit', link: 'Rudder'}]

export const obg = [{value: 'BR01', label: 'BR01', link: 'LP Winch'},
  {value: 'FR03', label: 'FR03', link: 'SG-RV'},
  {value: 'ND01', label: 'ND01', link: 'Nordavit'}]

export const products = [
    'Crane', 'DM', 'LP Winch', 'Nordavit', 'Rudder', 'SG', 'SG-RV', 'SG-SR', 'SG-SV', 'SG-TF'
]

export const ports = [
  'Rotterdam', 'Amsterdam', 'Reikjavik', 'Oslo', 'Ålesund'
]

function countperiod(j){
  let count = []
  let i
  let k = j+=1
  for(i = 1; i < k; i++){
    count.push(i)
  }
  return count
}

export const periods = countperiod(15)

export const ships = [
  {
    id: '23456',
    name: 'Boaty mc boatface',
    ports: 'Rotterdam',
    pos: 'lat,lng',
    desc: 'Description........'
  },
  {
    id: '43433',
    name: 'Fishy',
    ports: 'Ålesund',
    pos: 'lat,lng',
    desc: 'Description........'
  },
  {
    id: '31312',
    name: 'Laksen',
    ports: 'Ålesund',
    pos: 'lat,lng',
    desc: 'Description........'
  },
  {
    id: '43411',
    name: 'Karlens',
    ports: 'Ålesund',
    pos: 'lat,lng',
    desc: 'Description........'
  },
  {
    id: '43334',
    name: 'Hakon',
    ports: 'Amsterdam',
    pos: 'lat,lng',
    desc: 'Description........'
  },
  {
    id: '83443',
    name: 'Petulf',
    ports: 'Reikjavik',
    pos: 'lat,lng',
    desc: 'Description........'
  },
  {
    id: '64214',
    name: 'Ragnarok',
    ports: 'Oslo',
    pos: 'lat,lng',
    desc: 'Description........'
  },
  {
    id: '84833',
    name: 'Krosniv',
    ports: 'Rotterdam',
    pos: 'lat,lng',
    desc: 'Description........'
  },
  {
    id: '34553',
    name: 'Petra',
    ports: 'Reikjavik',
    pos: 'lat,lng',
    desc: 'Description........'
  },
  {
    id: '43674',
    name: 'Explorer',
    ports: 'Reikjavik',
    pos: 'lat,lng',
    desc: 'Description........'
  },
  {
    id: '23849',
    name: 'Gutrud',
    ports: 'Amsterdam',
    pos: 'lat,lng',
    desc: 'Description........'
  },
  {
    id: '12394',
    name: 'Saklas',
    ports: 'Amsterdam',
    pos: 'lat,lng',
    desc: 'Description........'
  },
  {
    id: '98765',
    name: 'Glabus',
    ports: 'Amsterdam',
    pos: 'lat,lng',
    desc: 'Description........'
  },
  {
    id: '19283',
    name: 'Kare',
    ports: 'Amsterdam',
    pos: 'lat,lng',
    desc: 'Description........'
  },
  {
    id: '64514',
    name: 'Rognark',
    ports: 'Oslo',
    pos: 'lat,lng',
    desc: 'Description........'
  },
  {
    id: '98433',
    name: 'Kalle',
    ports: 'Rotterdam',
    pos: 'lat,lng',
    desc: 'Description........'
  },
  {
    id: '91221',
    name: 'Kornelius',
    ports: 'Reikjavik',
    pos: 'lat,lng',
    desc: 'Description........'
  },
  {
    id: '88822',
    name: 'Dora',
    ports: 'Reikjavik',
    pos: 'lat,lng',
    desc: 'Description........'
  },
  {
    id: '01292',
    name: 'Kontius',
    ports: 'Amsterdam',
    pos: 'lat,lng',
    desc: 'Description........'
  },
  {
    id: '43322',
    name: 'Knoster',
    ports: 'Amsterdam',
    pos: 'lat,lng',
    desc: 'Description........'
  },
  {
    id: '98789',
    name: 'Larksen',
    ports: 'Amsterdam',
    pos: 'lat,lng',
    desc: 'Description........'
  },
  {
    id: '47563',
    name: 'Magnar',
    ports: 'Amsterdam',
    pos: 'lat,lng',
    desc: 'Description........'
  },
]
