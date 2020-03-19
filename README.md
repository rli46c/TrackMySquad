# TrackMySquad

Keep track of your working times right from your to-do list with just one click. No need to fill out timesheets or set up timers Built-in Collaboration.
Organise your team, projects and tasks. Real-time updates and notifications ensure everyone is always on the same page.

## ToDo

Replace Users.companyName/CompanyType with CompanyID
Timestamps in Models
ownerId in Company, Projects and Members Model
Use Loading in PrivateRoutes.js
Email verification link expiry time
Done using localStorage: DashTabs State Variable

## How to kill a process running on particular port in Linux?

    sudo kill -9 `sudo lsof -t -i:3000`

### Error Responses

axios.get('/foo')
.catch(function (error) {
if (error.response) {
console.log(error.response.data);
console.log(error.response.status);
console.log(error.response.headers);
}
});

#### Remove file from GIT Repo

git rm --cached name_of_file

#### Create user in Local MongoDB

use my_db_name
db.createUser({ user: "exampleUser",
pwd: "changeThisInfo",
roles: [{ role: "readAnyDatabase", db: "admin" },
"readWrite"] })
db.auth("exampleUser","changeThisInfo");
exit

#### Mongoose Aggregate

db.department.aggregate([
{
$match: { depNo: 101 }
},
{
$lookup: {
from: 'employee',
localField: 'depNo',
foreignField: 'depNo',
as: 'empDetails'
}
},
{
$project: {
depNO: 1,
departmentName: 1,
empDetails: {
empName: 1,
empSeatNo: 1
}
}
}
]);

#### Client IP Address

var ip = (req.headers['x-forwarded-for'] || '')
.split(',')
.pop()
|| req.connection.remoteAddress
|| req.socket.remoteAddress
|| req.connection.socket.remoteAddress

var ip = req.headers['x-forwarded-for']
|| req.connection.remoteAddress
|| req.socket.remoteAddress
|| (req.connection.socket ? req.connection.socket.remoteAddress : null);
