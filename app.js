const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const customerSchema = require("./models/CustomerSchema")

// Static files location
app.use(express.static('public'));


app.use(express.urlencoded({ extended: true }));


// override method to use put and delete
var methodOverride = require('method-override')
app.use(methodOverride('_method'))


mongoose.connect("mongodb+srv://admin:admin-omar@cluster0.hzfd5e1.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0").then(() => {
  app.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });
})
  .catch((err) => {
    console.log(err);
  });


// EJS as the templating  engine
app.set('view engine', 'ejs')


// Live reload setup
{
  const livereload = require("livereload");
  const path = require("path");
  const liveReloadServer = livereload.createServer();
  liveReloadServer.watch(path.join(__dirname, 'public'));

  const connectLivereload = require("connect-livereload");
  app.use(connectLivereload());

  liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
  });
}


//__ get__request __//


// login 
app.get('/', (req, res) => {
  res.render('login')
})

// home page
app.get('/home', (req, res) => {
  const data =
    customerSchema.find()
      .then((Data) => res.render('index', { Data: Data }))
      .catch(err => console.log(err))
})

// add new user
app.get('/add', (req, res) => {
  res.render('add')
})

// view user by id
app.get('/user/:id', (req, res) => {
  customerSchema.findById(req.params.id).then((result) => {
    res.render('user', { User: result })
    console.log(result)
  })
    .catch(err => console.log(err))
})

// edit user by id
app.get('/edit/:id', (req, res) => {

  customerSchema.findById(req.params.id).then((result) => {
    res.render('edit', { Edit: result })
  }).catch((err) => {
    res.send('Error loading edit page');
    console.log(err)
  })
})

// delete user by id
app.get('/delete/:id', (req, res) => {
  customerSchema.findById(req.params.id).then(() => {
    res.redirect('/home')
  }).catch((err) => {
    console.log(err)
  })

})


///////////////////////////////////////////////////////////////////////


//__post__request__//


// login request 
app.post("/", (req, res) => {
  const { userName, password } = req.body;
  if (userName === "admin" && password === "12admin12") {
    res.redirect("/home")
  } else {
    res.redirect("/")
  }
})

// search request
app.post('/search', (req, res) => {
  customerSchema.find({ $or: [{ firstname: req.body.searchText }, { lastname: req.body.searchText }] }).then((result) => {
    res.render("search", { Search: result })
  }).catch(err => console.log(err))
})

// add Requst
app.post('/add', (req, res) => {
  customerSchema.create(req.body)
    .then(() => res.redirect("/home"))
    .catch(err => console.log(err))
})

// edit request 
app.put('/edit/:id', (req, res) => {
  console.log(req.body);
  customerSchema.updateOne({ _id: req.params.id }, req.body).then(() => {
    res.redirect('/home')
  }).catch(err => console.log(err))
})

// delete request 
app.delete('/delete/:id', (req, res) => {
  console.log(req.body);
  customerSchema.deleteOne({ _id: req.params.id }, req.body).then(() => {
    res.redirect('/home')
  }).catch(err => console.log(err))
})