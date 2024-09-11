const Session = require("../models/Session");
const User = require("../models/User");

// create a new session
exports.createSession = async (req,res) => {
    try {
        const {userId,
             sessionType,
              duration,
               completed
            } = req.body;

            const session = new Session({
                userId,
                sessionType,
                duration,
                completed : completed || false, // default to false if not provided
            });

            // save the session to database
            await session.save();

            res.status(201).json({
                success : true,
                message: "Session created successfully",
                data : session,
            });
    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Error while creating session",
            error : error.message,
        });
    }
};


// get all session for a specific user
exports.getSessionByUser = async (req,res) => {
    try{
        const {userId} = req.params;

        // find all session for the given user id
        const sessions = await Session.find({userId}).populate("userId", "firstName email").exec();

        if(!sessions){
            return res.status(404).json({
                success : false,
                message : "No session found for thr given user",
            });
        }

        res.status(200).json({
            success : true,
            data : sessions,
        });
    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Error while fetching session",
            error : error.message,
        });
    }
};

// update a session like mark as complete
exports.updateSession = async (req,res) => {
    try{
        // need to create sessionId
        const {sessionId} = req.params;
        const {duration, completed} = req.body;

        // find the session and update it
        const session = await Session.findByIdAndUpdate(
            sessionId,
            {duration, completed},
            {new  : true}
        );

        if(!session){
            return res.status(404).json({
                success : false,
                message : "session not found",
            });
        }

        res.status(200).json({
            success : true,
            message : "Session updated successfully",
        });

    } catch (error){
        res.status(500).json({
            success : false,
            message : "Error updating session",
            error : error.message,
        });
    }
};

// delete a session
exports.deleteSession = async (req,res) => {
    try{
        const {sessionId} = req.params;

        // find the session and delete it4
        const session = await Session.findByIdAndDelete(sessionId);

        if(!session){
            return res.status(404).json({
                sucess : false,
                message : "session not found",
            });
        }
        res.status(200).json({
            success : true,
            message : "session deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Error deleting session",
            error : error.message,
        });
    }
};