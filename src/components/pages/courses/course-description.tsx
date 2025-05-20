type Props = {
    description?: string;
};

export const CourseDescription = ({ description }: Props) => {
    return <p className="py-6 text-justify">{description}</p>;
};
