import React from 'react'

import Downshift from 'downshift'

import ResultsComponent from '../ResultsComponent'

import {
  Label,
  Menu,
  ControllerButton,
  Input,
  Item,
  ItemTitle,
  ItemLabel,
  LabelsContainer,
  ArrowIcon,
  XIcon,
  css,
} from '../../utils/shared'

const AsyncSearchComponent = ({
  handleOnChange,
  handleOnIssueSelect,
  searchTerm,
  currentPage,
  changeCurrentPage,
}) => {
  return (
    <div
      {...css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: 50,
      })}
    >
      <Downshift
        itemToString={(item) => (!item ? '' : item.title)}
        onChange={(item) =>
          !item ? handleOnIssueSelect(null) : handleOnIssueSelect(item.body)
        }
      >
        {({
          inputValue,
          getInputProps,
          getLabelProps,
          getMenuProps,
          getItemProps,
          getToggleButtonProps,
          selectedItem,
          highlightedIndex,
          isOpen,
          clearSelection,
        }) => {
          return (
            <div {...css({ width: 450, margin: 'auto', position: 'relative' })}>
              <Label {...getLabelProps()}>Search an issue</Label>
              <div {...css({ position: 'relative' })}>
                <Input
                  {...getInputProps({
                    isOpen,
                    placeholder: 'Enter issue title',
                    onChange: handleOnChange,
                  })}
                />
                {selectedItem ? (
                  <ControllerButton
                    onClick={clearSelection}
                    aria-label="clear selection"
                  >
                    <XIcon />
                  </ControllerButton>
                ) : (
                  <ControllerButton {...getToggleButtonProps()}>
                    <ArrowIcon isOpen={isOpen} />
                  </ControllerButton>
                )}
              </div>
              <Menu {...getMenuProps({ isOpen })}>
                {(() => {
                  if (!isOpen) {
                    return null
                  }

                  if (!inputValue) {
                    return (
                      <Item disabled>You have to enter a search query</Item>
                    )
                  }

                  return (
                    <ResultsComponent
                      searchTerm={searchTerm}
                      currentPage={currentPage}
                    >
                      {({ data = { items: [] }, error, status }) => {
                        if (status === 'loading') {
                          return <Item disabled>Loading...</Item>
                        }

                        if (error) {
                          return <Item disabled>Error! ${error}</Item>
                        }

                        if (data?.items.length === 0) {
                          return <Item disabled>No issues found</Item>
                        }

                        return data?.items.map((item, index) => (
                          <Item
                            key={item.id}
                            {...getItemProps({
                              item,
                              index,
                              isActive: highlightedIndex === index,
                              isSelected: selectedItem === item,
                            })}
                          >
                            <ItemTitle>{item.title}</ItemTitle>
                            <LabelsContainer>
                              {item.labels.length === 0 ? (
                                <ItemLabel>No labels for this issue</ItemLabel>
                              ) : (
                                item.labels.map(({ id, name, color }) => {
                                  return (
                                    <ItemLabel key={id} color={color}>
                                      {name}
                                    </ItemLabel>
                                  )
                                })
                              )}
                            </LabelsContainer>
                          </Item>
                        ))
                      }}
                    </ResultsComponent>
                  )
                })()}
              </Menu>
            </div>
          )
        }}
      </Downshift>
    </div>
  )
}

export default AsyncSearchComponent
