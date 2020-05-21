

function scopedLeaveRequests(user, requests){
    if(user.position === 'HOD') return requests
    return requests.filter(request => request.requestBy._id === user._id )
}

module.exports = { scopedLeaveRequests }