import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User, { UserRole } from '@/models/User';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // Check if users already exist
    const existingUser = await User.findOne({ username: 'admin' });
    if (existingUser) {
      return NextResponse.json(
        { message: 'Database already seeded' },
        { status: 200 }
      );
    }

    // Create test users
    const users = [
      {
        username: 'superadmin',
        password: 'password123',
        email: 'superadmin@classcash.com',
        role: UserRole.SUPER_ADMIN,
      },
      {
        username: 'admin',
        password: 'password123',
        email: 'admin@classcash.com',
        role: UserRole.ADMIN_BENDAHARA,
      },
      {
        username: 'student',
        password: 'password123',
        email: 'student@classcash.com',
        role: UserRole.USER,
      },
    ];

    await User.insertMany(users);

    return NextResponse.json(
      {
        message: 'Database seeded successfully',
        testCredentials: {
          superAdmin: { username: 'superadmin', password: 'password123' },
          admin: { username: 'admin', password: 'password123' },
          student: { username: 'student', password: 'password123' },
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to seed database' },
      { status: 500 }
    );
  }
}
