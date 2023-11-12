export interface ProductProps {
    name: string;
    description: string;
    price: number;
    id: string;
    image: string;
}
export const Product: React.FC<ProductProps> = ({ id, image, description, name, price }) => {
    return (
        <div>
            <img src={image} alt={name} />
            <h1>{name}</h1>
            <p>{description}</p>
            <p>{price} kr</p>
            <button>Kjøp</button>
        </div>
    )
}