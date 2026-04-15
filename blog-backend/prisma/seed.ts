import { faker } from "@faker-js/faker";
import { db } from "../src/lib/db";
import { hashPassword } from "../src/lib/password";

async function seed(){

    try{
        await db.libraryPost.deleteMany();
        await db.library.deleteMany();
        await db.post.deleteMany();
        await db.user.deleteMany();

        console.log('🗑️  Cleared database');
        

        const users=await Promise.all(
            Array.from({length:10},async () =>{
                return db.user.create({
                    data:{
                        email:faker.internet.email(),
                        name:faker.person.fullName(),
                        passwordHash:await hashPassword('password123'),
                    },
                });
            })
        );
        console.log(`✅ Created ${users.length} users`);
    console.log('\n📧 Login Credentials:');
    users.forEach((user, i) => {
      console.log(`   User ${i + 1}: ${user.email} / password123`);
    });


    }catch(err){
        
     console.error('❌ Seed error:', err);
     process.exit(1);
    }
}

seed()
  .then(() => {
    console.log('🌱 Seed complete!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Seed failed:', err);
    process.exit(1);
  });