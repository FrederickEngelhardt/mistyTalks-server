
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('accounts').del()
    .then(function () {
      // Inserts seed entries
      return knex('accounts').insert([
        {
          id: 1,
          // fk?
          misty_voice: 'candi',
          set_emotions: 'unhappiness',
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        },
        {
        id: 2,
        // fk?
        misty_voice: 'cinnamon',
        set_emotions: 'sassy',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      },
      {
      id: 3,
      // fk?
      misty_voice: 'ginger',
      set_emotions: 'awkward',
      created_at: new Date('2016-06-26 14:26:16 UTC'),
      updated_at: new Date('2016-06-26 14:26:16 UTC')
    }
      ]);
    });
};
