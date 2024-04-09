import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import '../../styles/DnD.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { apiUrl } from '../../boredLocal';
import {Stack, Divider, Grid, Box, Typography, Button, Hidden} from "@mui/material";
import { useLocation } from 'react-router-dom';

function App() {
  
  const id = useLocation().pathname.split("/")[2];
  console.log(id);


  return (
    <Box>


    </Box>
  );
}

export default App;


/*

  const [characters, updateCharacters] = useState(finalSpaceCharacters);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
    console.log(items.map((char) => char.name));
  }

<DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                {characters.map(({id, name}, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <p>
                            { name }
                          </p>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
*/