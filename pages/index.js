import fs from 'fs/promises';
import path from 'path';

function HomePage(props) {

  const { products } = props;

  return (
    <>
   <ul>{products.map(product => (
     <li key={product.id}>{product.title}</li>
   ))}</ul>
   <h1>{props.timestamp}</h1>
   </>
  );
}

// Server-side code that help to pre-render pages
export async function getStaticProps() {
  
  const filepath = path.join(process.cwd(),'data','dummy-backend.json');
  const jsonData = await fs.readFile(filepath);
  const data = JSON.parse(jsonData);

  return {
    props: {
      products: data.products,
      timestamp: new Date().getMinutes()
    }, 
    revalidate: 10
  };
}

export default HomePage;
