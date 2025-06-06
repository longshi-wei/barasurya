import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react"
import { BsThreeDotsVertical } from "react-icons/bs"
import { FiEdit, FiTrash } from "react-icons/fi"

import type { CustomerTypePublic, ItemCategoryPublic, ItemPublic, ItemUnitPublic, SupplierPublic, UserPublic } from "../../client"
import EditUser from "../Admin/EditUser"
import EditSupplier from "../Suppliers/EditSupplier"
import EditItemCategory from "../Items/EditItemCategory"
import EditItemUnit from "../ItemUnits/EditItemUnit"
import EditItem from "../Items/EditItem"
import EditCustomerType from "../Customers/EditCustomerType"
import Delete from "./DeleteAlert"

interface ActionsMenuProps {
  type: string
  value: ItemCategoryPublic | ItemPublic | UserPublic | SupplierPublic | ItemUnitPublic | CustomerTypePublic
  disabled?: boolean
}

const ActionsMenu = ({ type, value, disabled }: ActionsMenuProps) => {
  const editUserModal = useDisclosure()
  const deleteModal = useDisclosure()
  const componentMap = {
    User: (
      <EditUser
        user={value as UserPublic}
        isOpen={editUserModal.isOpen}
        onClose={editUserModal.onClose}
      />
    ),
    Item: (
      <EditItem
        item={value as ItemPublic}
        isOpen={editUserModal.isOpen}
        onClose={editUserModal.onClose}
      />
    ),
    Supplier: (
      <EditSupplier
        supplier={value as SupplierPublic}
        isOpen={editUserModal.isOpen}
        onClose={editUserModal.onClose}
      />
    ),
    ItemCategory: (
      <EditItemCategory
        item={value as ItemCategoryPublic}
        isOpen={editUserModal.isOpen}
        onClose={editUserModal.onClose}
      />
    ),
    Unit: (
      <EditItemUnit
        item_unit={value as ItemUnitPublic}
        isOpen={editUserModal.isOpen}
        onClose={editUserModal.onClose}
      />
    ),
    CustomerType: (
      <EditCustomerType
        customer_type={value as CustomerTypePublic}
        isOpen={editUserModal.isOpen}
        onClose={editUserModal.onClose}
      />
    ),
  } as const;

  return (
    <>
      <Menu>
        <MenuButton
          isDisabled={disabled}
          as={Button}
          rightIcon={<BsThreeDotsVertical />}
          variant="unstyled"
        />
        <MenuList>
          <MenuItem
            onClick={editUserModal.onOpen}
            icon={<FiEdit fontSize="16px" />}
          >
            Edit {type}
          </MenuItem>
          <MenuItem
            onClick={deleteModal.onOpen}
            icon={<FiTrash fontSize="16px" />}
            color="ui.danger"
          >
            Delete {type}
          </MenuItem>
        </MenuList>
        {componentMap[type] ?? null}
        <Delete
          type={type}
          id={value.id}
          isOpen={deleteModal.isOpen}
          onClose={deleteModal.onClose}
        />
      </Menu>
    </>
  )
}

export default ActionsMenu
