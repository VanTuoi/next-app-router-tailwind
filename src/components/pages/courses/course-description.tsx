type Props = {
    description?: string;
};

export const CourseDescription = ({ description }: Props) => {
    return <p className="py-1 text-justify md:py-4">{description}</p>;
};
