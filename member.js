function skillsMember() {
    var member = {
        name: 'Jhon',
        age: 30,
        skills: ['HTML', 'CSS', 'JS'],
        details: function() {
            skills = this.skills;
            skills.forEach((skill) => {
                console.log(`${this.name} knows ${skill}`);
            });
        }
    }
    return member;
}