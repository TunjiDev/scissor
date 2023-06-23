import { Tag, TagLabel, TagRightIcon } from "@chakra-ui/react";
import LinkIcon from "@/assets/icons/link";
import React from "react";

type TagProps = {
  label: string;
  style?: React.CSSProperties;
};

enum Statuses {
  Active = "Active",
  Inactive = "Inactive",
}

const AppTag = ({ label, style }: TagProps) => {
  const colors: Record<string, string> = {
    [Statuses.Active]: "#1EB036",
    [Statuses.Inactive]: "#B0901E",
  };
  return (
    <Tag style={style} size={"md"} bg={"transparent"} borderRadius="full" color={colors[label]}>
      <TagLabel mr={".5rem"}>{label}</TagLabel>
      <TagRightIcon as={LinkIcon} />
    </Tag>
  );
};

export { AppTag };
