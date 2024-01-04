import React, { useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import {
  ChakraProvider,
  Heading,
  Input,
  Textarea,
  Card,
  Button,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberIncrementStepper,
  NumberInputStepper,
  NumberDecrementStepper,
  ButtonGroup,
  HStack,
  Divider,
  CardFooter,
  useToast,
  SimpleGrid,
  GridItem,
  TagCloseButton,
  TagLabel,
  VStack,
  Tag,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { useExp } from "./entity";
import DatePicker from "react-datepicker";
import { addExp } from "./http";
import "react-datepicker/dist/react-datepicker.css";

const NewExperimentPage = () => {
  const { exp, setExp } = useExp();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setExp((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFeeChange = (valueAsString: string, valueAsNumber: number) => {
    const newValue =
      isNaN(valueAsNumber) || valueAsNumber < 0 ? 0 : valueAsNumber;
    if (valueAsString !== undefined) {
    }
    setExp((prevData) => ({
      ...prevData,
      price: newValue,
    }));
  };

  const handlePnumChange = (valueAsString: string, valueAsNumber: number) => {
    const newValue =
      isNaN(valueAsNumber) || valueAsNumber < 0 ? 0 : valueAsNumber;
    if (valueAsString !== undefined) {
    }
    setExp((prevData) => ({
      ...prevData,
      pnum: newValue,
    }));
  };

  const handleCtimeChange = (valueAsString: string, valueAsNumber: number) => {
    const newValue =
      isNaN(valueAsNumber) || valueAsNumber < 0 ? 0 : valueAsNumber;
    if (valueAsString !== undefined) {
    }
    setExp((prevData) => ({
      ...prevData,
      ctime: newValue,
    }));
  };

  const [deadline, setDeadline] = useState<Date | null>(new Date());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    addExp(exp)
      .then((result) => {
        setIsLoading(false);
        toast({
          title: "Experiment created.",
          description: "Your experiments has been created",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
        window.location.href = `/detail/${result.eid}`;
      })
      .catch((error) => {
        toast({
          title: "Experiment Create Failed.",
          description: "Please try again.",
          status: "error",
          duration: 1000,
          isClosable: true,
        });
        console.error(error);
      });
  };

  const [tagInput, setTagInput] = useState("");

  const handleAddTag = () => {
    if (
      tagInput.trim() !== "" &&
      exp.tags != undefined &&
      !exp.tags.includes(tagInput.trim())
    ) {
      setExp((prevData) => ({
        ...prevData,
        tags: [tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handleEndTime = (value: Date) => {
    setExp((prevData) => ({
      ...prevData,
      end_time: format(value, "yyyy-MM-dd HH:mm:ss"),
    }));
    setDeadline(value);
  };

  const handleRemoveTag = (tag: string) => {
    setExp((prevData) => ({
      ...prevData,
      tags: prevData.tags?.filter((v) => v !== tag),
    }));
  };

  return (
    <ChakraProvider>
      <Card p={4} m={20}>
        <form onSubmit={handleSubmit}>
          <SimpleGrid columns={3} row={4}>
            <GridItem rowSpan={1} colSpan={3}>
              <Heading fontSize="2xl" mb={4} width="100%" textAlign="center">
                New Experiment
              </Heading>
            </GridItem>

            <GridItem rowSpan={4} colSpan={3}>
              <FormControl id="title" isRequired mb={4}>
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  name="title"
                  value={exp.title}
                  onChange={handleInputChange}
                />
              </FormControl>

              <VStack align="start" spacing={4}>
                <FormControl id="topics" mb={4}>
                  <FormLabel>Topics</FormLabel>
                  <HStack>
                    <Input
                      placeholder="Enter tag..."
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                    />
                    <Button onClick={handleAddTag}>+</Button>
                  </HStack>

                  <HStack align="start" spacing={2} mt={3}>
                    {exp.tags !== undefined &&
                      exp.tags.map((tag, index) => (
                        <Tag
                          key={index}
                          size="md"
                          variant="subtle"
                          colorScheme="blue"
                        >
                          <TagLabel>{tag}</TagLabel>
                          <TagCloseButton
                            onClick={() => {
                              handleRemoveTag(tag);
                            }}
                          />
                        </Tag>
                      ))}
                  </HStack>
                </FormControl>
              </VStack>

              <FormControl id="desc" isRequired mb={4}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  name="desc"
                  value={exp.desc}
                  onChange={handleInputChange}
                  height="300px"
                />
              </FormControl>
              <FormControl id="url" isRequired mb={4}>
                <FormLabel>Url</FormLabel>
                <Input
                  type="text"
                  name="url"
                  value={exp.url}
                  onChange={handleInputChange}
                />
              </FormControl>
            </GridItem>

            <GridItem rowSpan={1} colSpan={3}>
              <FormControl id="pnum" isRequired mb={4}>
                <FormLabel>Participant Number</FormLabel>
                <NumberInput
                  width="20%"
                  value={exp.pnum}
                  onChange={handlePnumChange}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </GridItem>

            <GridItem rowSpan={1} colSpan={3}>
              <FormControl id="ctime" isRequired mb={4}>
                <FormLabel>Estimated Completion Time (min)</FormLabel>
                <NumberInput
                  width="20%"
                  value={exp.ctime}
                  onChange={handleCtimeChange}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </GridItem>

            <GridItem rowSpan={1} colSpan={3}>
              <FormControl id="price" isRequired>
                <FormLabel>Reward ($)</FormLabel>

                <NumberInput
                  width="20%"
                  value={exp.price}
                  onChange={handleFeeChange}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </GridItem>

            <GridItem rowSpan={1} colSpan={3} mt={4}>
              <FormControl id="deadline" isRequired>
                <FormLabel>Deadline</FormLabel>
                <DatePicker
                  // icon={IoCalendarOutline}
                  selected={deadline}
                  onChange={handleEndTime}
                  showTimeSelect
                  timeFormat="HH:mm"
                  dateFormat="yyyy-MM-dd HH:mm"
                />
              </FormControl>
            </GridItem>

            <GridItem rowSpan={1} colSpan={3} mt={5}>
              <Divider />

              <CardFooter>
                <ButtonGroup
                  variant="outline"
                  spacing="6"
                  justifyContent="center"
                  width="100%"
                >
                  <Button
                    colorScheme="orange"
                    type="submit"
                    isLoading={isLoading}
                  >
                    Save
                  </Button>
                  <Button as={ReactRouterLink} to="/experiments">
                    Cancel
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </GridItem>
          </SimpleGrid>
        </form>
      </Card>
    </ChakraProvider>
  );
};

export default NewExperimentPage;
