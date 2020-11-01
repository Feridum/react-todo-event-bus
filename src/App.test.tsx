import React from 'react';
import { createEvent, fireEvent, render, waitFor } from '@testing-library/react';
import App from './App';
import { EventBusContextController } from './context/EventBus/EventBusContextController';

test('renders button', () => {
  const { getByText } = render(<EventBusContextController listeners={[]}><App /></EventBusContextController>);
  const button = getByText('Add task');
  expect(button).toBeInTheDocument();
});


const taskListEvent = createEvent(
  'taskList',
  document,
  {
    detail: {
      data: [{ name: 'test1' }]
    }
  },
  { EventType: 'CustomEvent' }
);

test('display list', async () => {
  const { getByText } = render(<EventBusContextController listeners={[]}><App /></EventBusContextController>);

  await waitFor(() => {
    fireEvent(document, taskListEvent);
  });

  await waitFor(() =>
    expect(getByText('test1')).toBeTruthy()
  )
});


test('call fetchTasks on mount', async () => {
  const fetchTasks = jest.fn();
  document.addEventListener('fetchTasks', fetchTasks);
  render(<EventBusContextController listeners={[]}><App /></EventBusContextController>);

  expect(fetchTasks).toBeCalled();
});


test('call addTask on click', async () => {
  const addTask = jest.fn();
  document.addEventListener('addTask', (e) => addTask((e as CustomEvent).detail));

  const { getByText } = render(<EventBusContextController listeners={[]}><App /></EventBusContextController>);

  const button = getByText('Add task');
  fireEvent.click(button);

  expect(addTask).toHaveBeenCalledWith({ name: 'test1' });
});