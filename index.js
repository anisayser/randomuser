const express = require('express');

const PORT = process.env.PORT || 5000;

const app = express();

//middleware
app.use(express.json());

//file system
const fs = require('fs');



/* const users = [
    {
        id: 1,
        gender: 'female',
        name: 'Vivan Ryan',
        contact: '(437) 507-1729',
        address: '938 Railroad St',
        photoUrl: 'https://randomuser.me/api/portraits/women/84.jpg'
    },
    {
        id: 2,
        gender: 'female',
        name: 'Shelly Ford',
        contact: '(351) 729-4500',
        address: '627 Locust Rd',
        photoUrl: 'https://randomuser.me/api/portraits/women/56.jpg'
    },
    {
        id: 3,
        gender: 'male',
        name: 'Erik Johnson',
        contact: 'Erik Johnson',
        address: '3438 Samaritan Dr',
        photoUrl: 'https://randomuser.me/api/portraits/men/47.jpg'
    },
    {
        id: 4,
        gender: 'male',
        name: 'Glen Barnett',
        contact: '(245) 490-8687',
        address: '3328 Ranchview Dr',
        photoUrl: 'https://randomuser.me/api/portraits/men/19.jpg'
    },
    {
        id: 5,
        gender: 'female',
        name: 'Mabel Neal',
        contact: '(871) 555-5445',
        address: '7209 White Oak Dr',
        photoUrl: 'https://randomuser.me/api/portraits/women/72.jpg'
    },
    {
        id: 6,
        gender: 'female',
        name: 'Miriam Ryan',
        contact: '(911) 674-3131',
        address: '7443 W Belt Line Rd',
        photoUrl: 'https://randomuser.me/api/portraits/women/20.jpg'
    },
    {
        id: 7,
        gender: 'female',
        name: 'Crystal Reynolds',
        contact: '(215) 331-7911',
        address: '6657 Valwood Pkwy',
        photoUrl: 'https://randomuser.me/api/portraits/women/95.jpg'
    },
    {
        id: 8,
        gender: 'male',
        name: 'Gene Newman',
        contact: '(780) 222-9978',
        address: '6815 College St',
        photoUrl: 'https://randomuser.me/api/portraits/men/64.jpg'
    },
    {
        id: 9,
        gender: 'female',
        name: 'Joann Burns',
        contact: '(727) 878-2836',
        address: '1444 Hillcrest Rd',
        photoUrl: 'https://randomuser.me/api/portraits/women/57.jpg'
    },
    {
        id: 10,
        gender: 'male',
        name: 'Cecil Mason',
        contact: '(933) 591-7744',
        address: '8285 Homestead Rd',
        photoUrl: 'https://randomuser.me/api/portraits/men/77.jpg'
    },
] */




app.get('/users/all', (req, res) => {
    fs.readFile('./users.json', (err, data) => {
        if (err) {
            res.send('Failed to load data.');
            res.end();
        } else {
            res.write(data);
            res.end();
        }
    })
})




app.get('/users/random', (req, res) => {

    fs.readFile('./users.json', (err, data) => {
        if (err) {
            res.send('Failed to load data.');
        } else {
            const parsedData = JSON.parse(data);
            const random = Math.floor(Math.random() * parsedData.length);
            const randomUser = parsedData[random];

            res.json(randomUser);
        }
    })

})

app.post('/user/save', (req, res) => {
    const user = req.body;

    fs.readFile('./users.json', (err, data) => {
        if (err) {
            res.send('Failed to load data.');
        } else {
            let parsedData = JSON.parse(data);
            const newData = [...parsedData, user];
            const stringifyData = JSON.stringify(newData);

            fs.writeFile('./users.json', stringifyData, (err) => {
                if (err) {
                    res.send('Failed to add new user');
                } else {
                    res.send('User added sucessfully.');
                }
            })

        }
    })

})


app.patch('/user/update/:id', (req, res) => {
    const userId = req.params.id;
    const updatedContact = req.query;

    fs.readFile('./users.json', (err, data) => {
        if (err) {
            res.send('Failed to load data for update.');
        } else {
            const parsedData = JSON.parse(data);
            const theUser = parsedData.find(user => user.id === Number(userId));

            if (Object.keys(updatedContact).length > 0 && updatedContact.contact) {

                theUser.contact = updatedContact.contact;
                const updatedStringifyUsers = JSON.stringify(parsedData);

                fs.writeFile('./users.json', updatedStringifyUsers, (err) => {
                    if (err) {
                        res.send('Something is wrong while updating the user.');
                    } else {
                        res.send('User Updated sucessfully.');
                    }
                })

            }

        }
    })

})


app.delete('/user/delete/:id', (req, res) => {
    const userId = req.params.id;

    fs.readFile('./users.json', (err, data) => {
        if (err) {
            res.send('Failed to load data for Delete.');
        } else {
            const parsedData = JSON.parse(data);
            const theUser = parsedData.filter(user => user.id !== Number(userId));

            if (theUser) {

                const updatedStringifyUsers = JSON.stringify(theUser);

                fs.writeFile('./users.json', updatedStringifyUsers, (err) => {
                    if (err) {
                        res.send('Something is wrong while Deleting the user.');
                    } else {
                        res.send('User Deleted sucessfully.');
                    }
                })
            }
        }
    })

});





app.get('/', (req, res) => {
    res.send('Random user server is running');
})

app.listen(PORT, () => {
    console.log('Listening to port', PORT);
})











