import {React, ReactRouterDOM, XState, XStateReact} from './global';

const {HashRouter, Route} = ReactRouterDOM;
import './normalize.css';
import './index.less';
import {Main} from "./Main";

const {createMachine} = XState;
const {useMachine} = XStateReact
const toggleMachine = createMachine({
  id: 'toggle',
  initial: 'inactive',
  states: {
    inactive: {
      on: {TOGGLE: 'active'}
    },
    active: {
      on: {TOGGLE: 'inactive'}
    }
  }
});

const Test = () => {
  const [state, send] = useMachine(toggleMachine, {});
  return (
    <button onClick={() => send('TOGGLE')}>
      {state.value === 'inactive'
        ? 'Click to activate'
        : 'Active! Click to deactivate'}
    </button>
  );
}

export default function Home() {
  return (
    <HashRouter>
      <Route path="/" exact component={Main}/>
      <Route path="/main" exact component={Test}/>
    </HashRouter>
  )
}
