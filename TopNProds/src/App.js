
import { useEffect, useState } from 'react';
import './App.css';
import ProductCard from './ProductCard';

const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=a7103f3c";

function App() {

  const [searchTerm,SetSearchTerm] = useState('');

  const [products,SetProducts] = useState([]);

  const SearchProduct = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json();
    //console.log(data.Search)

    SetProducts(data.Search);

  }

  useEffect(() => {
    SearchProduct('Spiderman');
  },[] )

  return (
    <div className="app">
      <div>
        <h1>E-commerce App</h1>
      </div>
      
      <div className='search'>
        <input 
        type='text'
        value={searchTerm}
        placeholder='Search for a product here'
        onChange={(e) => {SetSearchTerm(e.target.value)}}>
        </input>


        <button className='searchBtn' onClick={() => {SearchProduct(searchTerm)}}>Search</button>
      </div>

      {
        products?.length>0
        ?(
          <div className='container'>
            {
              products.map((prod) => (
                <ProductCard prod={prod}></ProductCard>
              ))
            }
          </div>
        ):
        (
          <div className='empty'>
            <p>No products found</p>
          </div>
        )
      }


    </div>
  );
}

export default App;
