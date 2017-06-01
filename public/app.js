var Router      = ReactRouterDOM.BrowserRouter;
var Route       = ReactRouterDOM.Route;
var Link        = ReactRouterDOM.Link;

class Add extends React.Component {
   constructor(props) {
      super(props);
      
      this.state = {};

      this.handleChangeProductPhoto = this.handleChangeProductPhoto.bind(this);
      this.handleChangeProductName = this.handleChangeProductName.bind(this);
      this.handleChangeProductDescription = this.handleChangeProductDescription.bind(this);
      this.handleChangeProductPrice = this.handleChangeProductPrice.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

   }



   handleChangeProductPhoto(event) {
      this.setState({valueProductPhoto: event.target.value});
   }

   handleChangeProductName(event) {
      this.setState({valueProductName: event.target.value});
   }

   handleChangeProductDescription(event) {
      this.setState({valueProductDescription: event.target.value});
   }

   handleChangeProductPrice(event) {
      this.setState({valueProductPrice: event.target.value});
   }

   handleSubmit(event) {


      event.preventDefault(); //j'annule l'effet du formulaire pour que le navigateur ne communique pas avec le serveur sinon le serveur va reprendre la main et va réécrire la page du formulaire en écrasant tout.
      fetch("/anadir-producto-admin-Alicia", {// Fetch permet de communiquer, en AJAX, du fichier Javascript au serveur.
        method: "POST",
        body: JSON.stringify({
            productPrice: this.state.valueProductPrice,
            productDescription: this.state.valueProductDescription,
            productName: this.state.valueProductName

        })
      });
     
   }

   render() {
      return (
         <div id="page">
            <div id="topping">
            </div>
            <section id="top">
               <header> 
                  <div className="container">                                   
                     <div id="logo">
                        <a href="#topping">Terapias<strong>Naturales</strong></a>
                     </div>
                     <nav className="navmenu">
                        <ul>
                           <li className="scrollable"><Link to="/delete-product-admin">Suprimir producto</Link></li>
                        </ul>
                    </nav>
                    <div className="clear">
                    </div>
                  </div>
               </header>
               <h2>Añadir producto</h2>
            </section>
            <section id="home">
               <section className="page_section" id="contact">
                  <div className="container block-wrap wow fadeInUp">
                     <div className="row">
                        <div className="col-md-3">
                        </div>
                        <div className="col-md-6">
                           <div className="contact_form block">
                              <div className="row">
                                 <div className="col-md-12 col-sm-12">
                                    <div id="note">
                                    </div>
                                 </div>   
                              </div> 
                             <div id="fields"> 
                                 <form id="form_details_products" className="row" onSubmit={this.handleSubmit} action="/anadir-producto-admin-Alicia" method="post" encType="multipart/form-data" >
                                    <div className="col-md-12 col-sm-12">
                                       <input className="inp productPhoto" onChange={this.handleChangeProductPhoto} value={this.state.valueProductPhoto} type="file" name="productPhoto" placeholder="Photo" title="Product Photo" id="photo"/> 
                                    </div>
                                    <div className="col-md-12 col-sm-12">
                                       <input className="inp productName" onChange={this.handleChangeProductName} value={this.state.valueProductName} type="text" name="productName" placeholder="Nombre del producto" title="Product Name"/> 
                                    </div>
                                    <div className="col-md-12 col-sm-12">
                                       <input className="inp productDescription" onChange={this.handleChangeProductDescription} value={this.state.valueProductDescription} type="text" name="productDescription" placeholder="Descripción" title="Product Description"/>
                                    </div>
                                    <div className="col-md-12 col-sm-12">
                                       <input className="inp productPrice" onChange={this.handleChangeProductPrice} value={this.state.valueProductPrice} type="text" name="productPrice" placeholder="Precio" title="Price"/>
                                    </div>
                                    <div className="clear">
                                    </div>
                                    <div className="col-md-12">
                                       <input className="shortcode_button submit" type="submit" value="Añadir este producto"/>
                                    </div>
                                    <div className="clear">
                                    </div>
                                 </form>
                              </div>
                           </div>
                           <div className="col-md-3">
                           </div>
                        </div>
                     </div>
                  </div>
               </section>
            </section>
         </div>
      );
   }
}


class Delete extends React.Component {
   constructor() {
      super();

      this.handleClick = this.handleClick.bind(this);
      
      // AJAX avec Fetch ===> l'AJAX permet au javascript de communiquer avec le serveur)
       this.state = {productList : productList};
      
   }

   handleClick(e) {
      e.preventDefault();
      fetch("/delete?id="+e.target.getAttribute('data-productId'));
      var i = e.target.getAttribute('data-i');
      productList.splice(i, 1);
      this.setState({productList : productList});
   }
      
   render() {

     var productJSX = [];
     for(var i=0; i<this.state.productList.length; i++) { 
         productJSX.push(<div className="col-md-3 col-sm-3 col-xs-12">
           <div className="product-single">
               <a href="#"><img src={"/images/shop/"+this.state.productList[i]._id+".jpg"} /></a>
               <div className="hot-wid-rating">
                   <h4>
                       <a href={"/compra?id="+this.state.productList[i].id}>{this.state.productList[i].productName}</a>
                   </h4>
                   <h4>
                       Descripción: {this.state.productList[i].productDescription}
                   </h4>
                   <div className="product-wid-price">
                       <h4>
                           <ins>
                               {this.state.productList[i].productPrice}€
                           </ins>
                       </h4> 
                   </div>
                   <div>
                       <h4>
                           <input  type="button" onClick={this.handleClick} data-productId={this.state.productList[i]._id} data-i={i} className="shortcode_button" value="Suprimir" />   
                           
                       </h4>
                   </div>
               </div>
           </div>
         </div>);
      }

      return (
         <div>
            <div id="page">
               <div id="topping">
               </div>
               <section id="top">
                  <header> 
                     <div className="container">                                   
                        <div id="logo">
                           <a href="#topping">Terapias<strong>Naturales</strong></a>
                        </div>
                        <nav className="navmenu">
                           <ul>
                              <li className="scrollable"><Link to="/add-product-admin">Añadir producto</Link></li>
                           </ul>
                        </nav>
                        <div className="clear">
                        </div>
                     </div>
                  </header>               
               </section>
               <section className="page_section" id="shop">      
                  <div className="container wow fadeInUp">
                     <header className="head_section center_section">
                        <h2>Suprimir producto de la lista</h2>
                        <div className="separator">
                        </div>
                     </header>
                     <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="tab-content">
                           <div role="tabpanel" className="tab-pane">
                              <div className="row">
                                 {productJSX}

                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </section>
            </div>
         </div>                           
      );
   }
}


ReactDOM.render(
   <Router>
      <div> 
        <Route path="/add-product-admin" component={Add}/>        
        <Route path="/delete-product-admin" component={Delete}/> 
      </div>  
   </Router>
   ,
   document.getElementById('container')
);