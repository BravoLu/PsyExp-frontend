import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";

const ExpSkeleton = () => {
  return (
    <Card width="100%">
      <Skeleton height="380px"/>
        <CardBody>
          <SkeletonText />
        </CardBody>
    </Card>
  );
};

export default ExpSkeleton;
