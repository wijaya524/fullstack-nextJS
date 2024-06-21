interface HeadingProps {
    title: string
    description?: string
}

export const Heading: React.FC<HeadingProps> = ({title, description}) => {

    return (
        <div>
            <h1 className="text-3xl font-bold">{title}</h1>
            <p>{description}</p>
        </div>
    )
}