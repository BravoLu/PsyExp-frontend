import React, { useState, useEffect } from "react";
import { Link as ReactRouterLink, useParams } from "react-router-dom";
import {
  ChakraProvider,
  Box,
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
  Grid,
  GridItem,
  TagCloseButton,
  TagLabel,
  VStack,
  Tag,
  useDisclosure,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { useExp } from "./entity";
import DatePicker from "react-datepicker";
import { queryExp } from "./http";
import { updateExp } from "./http";
import "react-datepicker/dist/react-datepicker.css";
import CustomAlertDialog from "../utils/alertDialog";

const UpdateExperimentPage = () => {
  const { exp, setExp } = useExp();
  const toast = useToast();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const {
    isOpen: isUpdateOpen,
    onOpen: onUpdateOpen,
    onClose: onUpdateClose,
  } = useDisclosure();

  const {
    isOpen: isCancelOpen,
    onOpen: onCancelOpen,
    onClose: onCancelClose,
  } = useDisclosure();

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
    onUpdateOpen();
  };

  const handleUpdateClick = () => {
    updateExp(exp)
      .then(() => {
        setIsLoading(false);
        onUpdateClose();
        window.location.href = `/detail/${exp.eid}`;
      })
      .catch((error) => {
        setIsLoading(false);
        toast({
          title: "Experiment Updated failed.",
          description: "Please try again.",
          status: "error",
          duration: 1000,
          isClosable: true,
        });
        console.error(error);
      });
  };

  const handleCancelClick = () => {
    window.location.href = `/myExp/${localStorage.getItem("uid")}`;
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
      deadline: format(value, "yyyy-MM-dd HH:mm:ss"),
    }));
    setDeadline(value);
  };

  const handleRemoveTag = (tag: string) => {
    setExp((prevData) => ({
      ...prevData,
      tags: prevData.tags?.filter((v) => v !== tag),
    }));
  };

  useEffect(() => {
    if (id !== undefined) {
      queryExp(id)
        .then((result) => {
          setExp((prev) => {
            const updatedExp = {
              ...prev,
              ...result.exp,
              subs: result.subs,
              subs_num: result.subs_num,
            };
            return updatedExp;
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  return (
    <ChakraProvider>
      <Box mt={20} mb={20}>
        <Button
          variant="outline"
          colorScheme="orange"
          m={2}
          as={ReactRouterLink}
          to={`/myExp/${localStorage.getItem("uid")}`}
        >
          {" "}
          Back
        </Button>
        <Card p={4} m={2}>
          <form onSubmit={handleSubmit}>
            <Grid templateRows="repeat(5)" templateColumns="repeat(3)">
              <GridItem rowSpan={1} colSpan={3}>
                <Heading fontSize="2xl" mb={4} width="100%" textAlign="center">
                  Update Experiment
                </Heading>
              </GridItem>
              <GridItem rowSpan={3} colSpan={3}>
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
                              onClick={() => handleRemoveTag(tag)}
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

              <GridItem rowSpan={1} colSpan={3}>
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
                      Update
                    </Button>
                    <CustomAlertDialog
                      onOpen={onUpdateOpen}
                      isOpen={isUpdateOpen}
                      onClose={() => {
                        setIsLoading(false);
                        onUpdateClose();
                      }}
                      onClick={handleUpdateClick}
                      Text={"Update the experiment?"}
                    />
                    <Button onClick={onCancelOpen}>Cancel</Button>
                    <CustomAlertDialog
                      onOpen={onCancelOpen}
                      isOpen={isCancelOpen}
                      onClose={onCancelClose}
                      onClick={handleCancelClick}
                      Text={"Discard all the changes?"}
                    />
                  </ButtonGroup>
                </CardFooter>
              </GridItem>
            </Grid>
          </form>
        </Card>
      </Box>
    </ChakraProvider>
  );
};

export default UpdateExperimentPage;
