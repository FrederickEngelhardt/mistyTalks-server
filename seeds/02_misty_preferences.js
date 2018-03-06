
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      return knex('table_name').insert([
        {id: 1,
         //fk?,
         preference_name: 'home',
         robot_name: 'jill',
         ip_address: '10.0.10.205',
         port_number: '88'
        },
        {id: 2,
          //fk?,
          preference_name: 'work',
          robot_name: 'jane',
          ip_address: '10.0.10.208',
          port_number: '80'
        },
        {id: 3,
          //fk?,
          preference_name: 'den',
          robot_name: 'june',
          ip_address: '10.0.10.210',
          port_number: '90'
        }
      ]);
    });
};
