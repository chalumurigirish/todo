import { useState } from 'react';
import { HStack, Checkbox, Text, Button, Box } from '@chakra-ui/react';

const IndividualTodo = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <HStack justify='space-between'>
      <Box display='flex'>
        <Checkbox
          px='2'
          onChange={() => {
            setIsChecked(!isChecked);
          }}
        ></Checkbox>
        <Text>My todo</Text>
      </Box>
      <HStack>
        <Button>Edit</Button>
        <Button>Remove</Button>
      </HStack>
    </HStack>
  );
};

export default IndividualTodo;
