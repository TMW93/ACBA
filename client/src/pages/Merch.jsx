import Nav from "../components/Nav";
import Footer from "../components/Footer";
import snow from '../../public/placeholders/ilovesnow.jpg'
import duragcat from '../../public/placeholders/duragCat.jpg'
import catbanner from '../../public/placeholders/catbanner.jpg'
import gf7x from '../../public/placeholders/gf7x.jpg'
import logo from '../../public/icons/acbaLogo.png'

const products = [
  {
    id: 1,
    name: 'Earthen Bottle',
    href: '#',
    price: '$48',
    src: snow,
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  },
  {
    id: 2,
    name: 'Nomad Tumbler',
    href: '#',
    price: '$35',
    src: duragcat,
    imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
  },
  {
    id: 3,
    name: 'Focus Paper Refill',
    href: '#',
    price: '$89',
    src: catbanner,
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
  },
  {
    id: 4,
    name: 'Machined Mechanical Pencil',
    href: '#',
    price: '$35',
    src: logo,
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  {
    id: 5,
    name: 'Focus Card Tray',
    href: '#',
    price: '$64',
    src: gf7x,
    imageAlt: 'Paper card sitting upright in walnut card holder on desk.',
  },
  {
    id: 6,
    name: 'Focus Multi-Pack',
    href: '#',
    price: '$39',
    src: snow,
    imageAlt: 'Stack of 3 small drab green cardboard paper card refill boxes with white text.',
  },
  {
    id: 7,
    name: 'Brass Scissors',
    href: '#',
    price: '$50',
    src: logo,
    imageAlt: 'Brass scissors with geometric design, black steel finger holes, and included upright brass stand.',
  },
  {
    id: 8,
    name: 'Focus Carry Pouch',
    href: '#',
    price: '$32',
    src: gf7x,
    imageAlt: 'Textured gray felt pouch for paper cards with snap button flap and elastic pen holder loop.',
  },
]

const Merch = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-white py-24 sm:py-32 dark:bg-gray-900">
      <Nav />
      {/* Content */}
      <div className="flex-1 mx-auto max-w-2xl -mt-30 px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h1 className="mb-10 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
              Shop
        </h1>
        <h2 className="sr-only">Products</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <a key={product.id} href={product.href} className="group">
              <img
                alt={product.imageAlt}
                src={product.src}
                className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
              />
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
            </a>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  )
};

export default Merch;