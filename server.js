var express = require('express');
var app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');


var bodyParser = require('body-parser');
var stripe = require('stripe')('sk_test_Y4B5s3yG3kfYMJtneqC0lo4M');
var fileUpload = require('express-fileupload');

app.use(fileUpload());
app.use(express.static('public'));
app.set('view engine', 'ejs');
// parse application/x-www-form-urlencoded*/ 
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json 
app.use(bodyParser.json());

var mongoose= require('mongoose');
//mongoose.connect('mongodb://localhost/terapias_naturales_alicia' , function(err) {
mongoose.connect('mongodb://marinaole:24052012AMOUR@ds133991.mlab.com:33991/terapias-naturales' , function(err) {
});
//Les schémas : ils permettent de définir les types des données:
var productSchema = mongoose.Schema({
    productName: String,
    productDescription: String,
    productPrice: Number,
    productPhoto: String
});
//Les modèles permettent d'enregistrer les données dans mongoDB:
// Lier le schéma au modèle:
var ProductModel = mongoose.model('Products', productSchema);

/*var product = new ProductModel ({ //bloc que j'ai utilisé pour tester le bon fonctionnement de la base de données avec un produit 
 	productName: "Saco Tao Azul", 
 	productDescription: "Saco de semillas que se calienta en el micro-ondas", 
 	productPrice: "25€"
});
//Enregistrement du document:
product.save(function (error, product) {
});*/
//Récupérer toute la collection:*/
app.get('/add-product-admin', function (req, res) {
	ProductModel.find(function (err, products) {
  		console.log(products);
		res.render('index.ejs', {shopList : {} });
	});
});

app.post("/anadir-producto-admin-Alicia", function (req, res) {
	//Construction d'un document : 
	var product = new ProductModel ({
		productPhoto:req.body.productPhoto,//Quand on utilise des req.body (en post) ou req.query (en get), c'est pour récupérer (?) les données qui sont données dans l'url 
		productName: req.body.productName , //ici productName à droite c'est la valeur de name du formulaire dans le fichier form_details_products 
		productDescription: req.body.productDescription , 
		productPrice: req.body.productPrice
	});
	//Enregistrement du document dans la base de données:
	product.save(function (error, product) {
        req.files.productPhoto.mv('./public/images/shop/'+product.id+'.jpg' , function(err) {
                    }); //Là, je spécifie public parce que je veux écrire (enregistrer?) et pas lire (voir?) un fichier image
		res.render('confirm_add_details');
	});
});

app.get('/', function (req, res) {
	ProductModel.find(function (err, shop) { // je récupère toute la collection de produits depuis la base de données 
  		/*console.log(shop);*/
		res.render('index', {shopList : shop}); //et je l'affiche dans la page de l'index shop
	});
});

app.get('/compra', function (req,res) {
	console.log(req.query.id);
	res.render('shop_form', {idProduct : req.query.id}); //je déverse l'id dans la boite idProduct qui correspond à ma vue (fichier ejs) =dans la page du formulaire de paiement.
}); //l'id unique par produit est donné par mongodb automatiquement et est celui qui s'affiche dans l'url du formulaire de détails du produit

app.post('/compra', function (req, res) {
	console.log(req.body.productId);
	// Je réalise un filtre pour ne récupérer que le produit qui a cet id (celui qui est dans le console.log)
 	ProductModel.findOne( {_id: req.body.productId} , function (err, product) { //findOne ça veut dire donne-moi, mongodb, le premier produit de la liste qui a cet id (au cas où il en aurait plusieurs mais ce n'est pas le cas de toute façon)
 		console.log(product);// juste au-dessus, devant id, il y a un underscore parce que dans mongodb c écrit comme ça, il y a un underscore devant.
 		let amount = product.productPrice * 100; //Pour stripe, 2000 = 20 donc si je veux que le prix soit égal à 20€ il faut que je le multiplie par 100
		stripe.charges.create({
			amount: amount,
			description: product.productName,
			source: req.body.stripeToken,
			currency: "eur",
			metadata: {
				lastName: req.body.lastName, //je mets les valeurs des name de mon formulaire sous forme de req.body et non req.query car je suis en post
				firstName: req.body.firstName,
				email:req.body.email,
				phone:req.body.phone,
				adress:req.body.adress,
				description: product.productDescription
			}
		});
		res.render('check_out_form');
	});
});

app.get('/delete-product-admin', function (req, res) {
	ProductModel.find(function (err, shop) { // je récupère toute la collection de produits depuis la base de données 
  		
  		res.render('index.ejs', {shopList : shop});//et je l'affiche dans la page de delete_product_form
  	});
});

app.get('/delete', function (req, res) {
	console.log(req.query.id);
	/*console.log(shop);*/ 
    ProductModel.remove({_id: req.query.id}, function(error) {// je supprime le produit de la base de données
    	res.redirect('/suprimir-producto-admin-Alicia');
    });
});


app.listen(80, function () {
  console.log("Server listening on port 80");
});