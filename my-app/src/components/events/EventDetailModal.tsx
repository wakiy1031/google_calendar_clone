"use client";

import { Event } from "@/types";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalOverlay,
  Button,
  Flex,
  IconButton,
} from "@yamada-ui/react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { MdEdit, MdDelete } from "react-icons/md";

interface EventDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event;
  onEdit: () => void;
  onDelete: () => void;
}

export default function EventDetailModal({
  isOpen,
  onClose,
  event,
  onEdit,
  onDelete,
}: EventDetailModalProps) {
  const isAllDay = event.startTime === "00:00" && event.endTime === "23:59";

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" width="full">
      <ModalOverlay />
      <ModalBody p={0} overflow="hidden" w="full">
        <Flex justifyContent="space-between" alignItems="center">
          <IconButton
            aria-label="Edit"
            icon={<MdEdit />}
            onClick={onEdit}
            variant="ghost"
            _hover={{ bg: "whiteAlpha.200" }}
          />
          <IconButton
            aria-label="Delete"
            icon={<MdDelete />}
            onClick={onDelete}
            variant="ghost"
            _hover={{ bg: "whiteAlpha.200" }}
          />
          <ModalCloseButton _hover={{ bg: "whiteAlpha.200" }} />
        </Flex>
        <h2 className="text-xl font-medium mb-4">
          {event.title || "（タイトルなし）"}
        </h2>
        <p className="text-sm">
          {format(event.date, "yyyy年M月d日（E）", { locale: ja })}
          {!isAllDay && (
            <>
              {" "}
              · {event.startTime}～{event.endTime}
            </>
          )}
        </p>
      </ModalBody>
    </Modal>
  );
}
