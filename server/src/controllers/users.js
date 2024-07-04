import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

export const signUp = async (req, res) => {
    const { username, email, profilePhoto, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(404).json({ message: "User already registered"});
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        
        const user = await User.create({ 
            email, 
            username, 
            password: hashedPassword, 
            imgURL: profilePhoto, 
            likedSongs: [], 
            history: [], 
            uploadedSongs: [],
            playlists: [],
        })

        const newToken = jwt.sign({ 
                email: user.email, 
                id: user._id, 
            }, 
            process.env.SECRET_KEY, 
            {
                expiresIn: process.env.JWT_EXPIRE,
            }
        )
        res.status(200).json({ user, token: newToken });

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
}

export const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ message: "User not found."});
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) res.status(405).json({ message: 'Wrong email or password'});

        const newToken = jwt.sign({ 
                email: existingUser.email, 
                id: existingUser._id, 
            }, 
            process.env.SECRET_KEY, 
            {
                expiresIn: process.env.JWT_EXPIRE,
            }
        )
        res.status(200).json({ user: existingUser, token: newToken });

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
}

export const signInGoogle = async (req, res) => {
    const { email, username, profilePhoto } = req.body;
    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            const newToken = jwt.sign({ 
                    email: existingUser.email, 
                    id: existingUser._id, 
                }, 
                process.env.SECRET_KEY, 
                {
                    expiresIn: process.env.JWT_EXPIRE,
                }
            )
            return res.status(200).json({ user: existingUser, token: newToken });
        }

        const user = await User.create({ 
            email, 
            username, 
            password: process.env.SECRET_KEY, 
            imgURL: profilePhoto, 
            likedSongs: [], 
            history: [], 
            uploadedSongs: [],
            playlists: [],
        })
        
        const newToken = jwt.sign({ 
                email: user.email, 
                id: user._id, 
            }, 
            process.env.SECRET_KEY, 
            {
                expiresIn: process.env.JWT_EXPIRE,
            }
        )
        res.status(200).json({ user: user, token: newToken });

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
}

export const updateProfile = async (req, res) => {
    const id = req.userId;
    const { username, profilePhoto } = req.body;
  
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      await User.findOneAndUpdate(
        { _id: id },
        {
          username,
          imgURL: profilePhoto,
        },
        { new: true, upsert: true } // new: true returns the updated document, upsert: true creates if not found
      );
  
      res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
};

export const getUser = async (req, res) => {
    const { _id } = req.params;
    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({ message: 'Not found'});
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
}