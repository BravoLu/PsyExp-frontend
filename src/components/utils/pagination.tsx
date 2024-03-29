import { Button, HStack } from "@chakra-ui/react";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <HStack spacing={2} justifyContent="center" h="auto" mt={6} mb={20}>
      {pages.map((page) => (
        <Button
          key={page}
          onClick={() => onPageChange(page)}
          colorScheme={currentPage === page ? "orange" : "gray"}
        >
          {page}
        </Button>
      ))}
    </HStack>
  );
}

export default Pagination;
