import { IconButton, Spinner } from "@chakra-ui/react";
import { CheckIcon, TimeIcon, CloseIcon, ViewIcon } from "@chakra-ui/icons";
import { FaVenus, FaMars } from "react-icons/fa";

interface Props {
  state: string | number;
}

const StateIcon = ({ state }: Props) => {
  const getIconProps = (state: string | number) => {
    switch (state) {
      case "GENDER_TYPE_MAN":
        return {
          variant: "solid",
          colorScheme: "blue",
          icon: <FaMars />,
          label: "male",
        };
      case "GENDER_TYPE_WOMAN":
        return {
          variant: "solid",
          colorScheme: "pink.500",
          icon: <FaVenus />,
          label: "female",
        };
      case "SubInvalid":
        return {
          variant: "outline",
          colorScheme: "blue",
          icon: <ViewIcon />,
          label: "View",
        };
      case "STATE_EXP_FINISHED":
        return {
          variant: "ghost",
          colorScheme: "green",
          icon: <CheckIcon />,
          label: "Done",
        };
      case "Approved":
        return {
          variant: "solid",
          colorScheme: "green",
          icon: <CheckIcon />,
          label: "Done",
        };
      case "STATE_EXP_PUBLISHED":
        return {
          variant: "ghost",
          colorScheme: "orange",
          icon: <TimeIcon />,
          label: "Running",
        };
      case "STATE_EXP_DELETED":
        return {
          variant: "outline",
          colorScheme: "red",
          icon: <CloseIcon />,
          label: "Closed",
        };
      case "Rejected":
        return {
          variant: "outline",
          colorScheme: "red",
          icon: <CloseIcon />,
          label: "Closed",
        };
      case "Init":
        return {
          variant: "ghost",
          colorScheme: "blue.500",
          icon: <Spinner />,
          label: "running",
        };
      case "STATE_EXP_INVALID":
        return {
          variant: "ghost",
          colorScheme: "orange",
          icon: <TimeIcon />,
          label: "running",
        };
      default:
        return null;
    }
  };

  const iconProps = getIconProps(state);

  if (!iconProps) {
    return null; // Or render a default icon or handle unknown state
  }

  const { variant, colorScheme, icon, label } = iconProps;

  return (
    <IconButton
      mr={5}
      isRound={true}
      variant={variant}
      colorScheme={colorScheme}
      aria-label={label}
      fontSize="20px"
      icon={icon}
    />
  );
};

export default StateIcon;
