FROM postgres:14

# Copy the SQL script
COPY init.sql /docker-entrypoint-initdb.d/

# Set permissions on the script
RUN chmod 0755 /docker-entrypoint-initdb.d/init.sql