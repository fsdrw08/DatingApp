let Mock = require('better-mock');
let Random = Mock.Random;

Random.extend({
    nation: function(date) {
        const nations = ['Australia',
        'Canada',
        'Saudi Arabia',
        'United States',
        'India',
        'Russia',
        'South Africa',
        'Turkey',
        'Argentina',
        'Brazil',
        'Mexico',
        'France',
        'Germany',
        'Italy',
        'United Kingdom',
        'China',
        'Indonesia',
        'Japan',
        'South Korea',
        ]
        return this.pick(nations)
    }
})

function Photos() {
    var data = []

    var image = Random.image('300x150',Random.color(),Random.word(2,6))

    data.push({
        url: image,
        isMain: "true",
        description: Random.paragraph(1,2)
    })
    
    return data
}

module.exports = function () {
    var data = {
        user:[]
    };

    for (var i = 0; i < 5; i++) {
        var Content = Random.paragraph(0,10);

        data.user.push(
            {
                username: Random.first(),
                Gender: "female",
                DateOfBirth: Random.date('yyyy-MM-dd'),
                Password: "password",
                KnowAs: this.username,
                Create: Random.now('year','yyyy-MM-dd'),
                LastActive: this.Create,
                Introduction: Content.substr(0,10),
                LookingFor: Content.substr(10,10),
                Interests: Content.substr(20,10),
                City: Random.city(),
                Country: Random.nation(),
                Photos: Photos(),
            }
        )
    }

    return data
}

