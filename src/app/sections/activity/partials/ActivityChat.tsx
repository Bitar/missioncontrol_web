import {ChannelsProvider} from '../ChatChannelProvider'
import {getAuth, useAuth} from '../../../modules/auth'
import {ActivityChatInner} from './ActivityChatInner'

const ActivityChat = () => {
  const {currentUser} = useAuth()
  const auth = getAuth()

  return (
    <div className='d-flex flex-column flex-lg-row'>
      <div className='flex-lg-row-fluid'>
        <div className='card' id='kt_chat_messenger'>
          {auth && auth.token && currentUser && currentUser.id && (
            <ChannelsProvider authUser={currentUser} authToken={auth?.token}>
              <ActivityChatInner />
            </ChannelsProvider>
          )}
        </div>
      </div>
    </div>
  )
}

export {ActivityChat}
