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
  searchTerm,
  currentPage,
  handleOnChange,
  changeCurrentPage,
}) => {
  return (
    <div
      {...css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: 50,
      })}
    >
      <Downshift onChange={(selection) => console.log(selection)}>
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

                        return data?.items.map(
                          ({ id, title: item, labels }, index) => (
                            <Item
                              key={id}
                              {...getItemProps({
                                item,
                                index,
                                isActive: highlightedIndex === index,
                                isSelected: selectedItem === item,
                              })}
                            >
                              <ItemTitle>{item}</ItemTitle>
                              <LabelsContainer>
                                {labels.length === 0 ? (
                                  <ItemLabel>
                                    No labels for this issue
                                  </ItemLabel>
                                ) : (
                                  labels.map(({ id, name, color }) => {
                                    return (
                                      <ItemLabel key={id} color={color}>
                                        {name}
                                      </ItemLabel>
                                    )
                                  })
                                )}
                              </LabelsContainer>
                            </Item>
                          ),
                        )
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
