import { useState } from "react";
import { Input, Flex, IconButton } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = () => {
    // Implement your search logic here
  };
  return (
    <Flex>
      <Input
        placeholder="Not implemented yet..."
        mr={2}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <IconButton
        aria-label="Search"
        icon={<SearchIcon />}
        colorScheme="orange"
        onClick={handleSearch}
      />
    </Flex>
  );
};

export default SearchBar;
